import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prisma = new PrismaClient();

async function seedDatabase() {
  const count = await prisma.project.count();
  if (count === 0) {
    console.log('Seeding database...');
    const projects = [
      {
        title: 'Modern Glass Office Tower',
        description: 'A 40-story commercial office building featuring a fully glazed facade, sustainable energy systems, and premium amenities.',
        category: 'Commercial',
        imageUrls: JSON.stringify([
          'https://picsum.photos/seed/office1/1920/1080',
          'https://picsum.photos/seed/office2/1920/1080'
        ]),
        completionDate: new Date('2024-11-15'),
        clientName: 'Apex Holdings',
      },
      {
        title: 'Luxury Cliffside Residence',
        description: 'A stunning 5-bedroom luxury home built into a cliffside, offering panoramic ocean views and an infinity pool.',
        category: 'Residential',
        imageUrls: JSON.stringify([
          'https://picsum.photos/seed/residence1/1920/1080',
          'https://picsum.photos/seed/residence2/1920/1080'
        ]),
        completionDate: new Date('2025-02-20'),
        clientName: 'Private Client',
      },
      {
        title: 'Urban Renewal Complex',
        description: 'Mixed-use development combining retail spaces, residential apartments, and a public park to revitalize the downtown area.',
        category: 'Mixed-Use',
        imageUrls: JSON.stringify([
          'https://picsum.photos/seed/urban1/1920/1080',
          'https://picsum.photos/seed/urban2/1920/1080'
        ]),
        completionDate: new Date('2023-08-10'),
        clientName: 'City Development Corp',
      },
      {
        title: 'Eco-Friendly Boutique Hotel',
        description: 'A 50-room boutique hotel constructed with sustainable materials, featuring a green roof and solar power integration.',
        category: 'Hospitality',
        imageUrls: JSON.stringify([
          'https://picsum.photos/seed/hotel1/1920/1080',
          'https://picsum.photos/seed/hotel2/1920/1080'
        ]),
        completionDate: new Date('2024-05-05'),
        clientName: 'GreenStay Resorts',
      },
      {
        title: 'State-of-the-Art Medical Center',
        description: 'A comprehensive healthcare facility equipped with the latest technology, designed for patient comfort and operational efficiency.',
        category: 'Healthcare',
        imageUrls: JSON.stringify([
          'https://picsum.photos/seed/medical1/1920/1080',
          'https://picsum.photos/seed/medical2/1920/1080'
        ]),
        completionDate: new Date('2023-12-01'),
        clientName: 'Regional Health Partners',
      },
      {
        title: 'Industrial Logistics Hub',
        description: 'A massive 500,000 sq ft distribution center featuring automated sorting systems and extensive truck loading bays.',
        category: 'Industrial',
        imageUrls: JSON.stringify([
          'https://picsum.photos/seed/logistics1/1920/1080',
          'https://picsum.photos/seed/logistics2/1920/1080'
        ]),
        completionDate: new Date('2025-01-15'),
        clientName: 'Global Freight Ltd',
      }
    ];

    for (const project of projects) {
      await prisma.project.create({ data: project });
    }
    console.log('Database seeded successfully.');
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Seed DB on startup
  await seedDatabase();

  // API Routes
  app.get('/api/projects', async (req, res) => {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  app.get('/api/projects/:id', async (req, res) => {
    try {
      const project = await prisma.project.findUnique({
        where: { id: req.params.id }
      });
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  });

  app.post('/api/leads', async (req, res) => {
    try {
      // Basic validation
      const { name, email, phone, projectType, message } = req.body;
      if (!name || !email || !projectType || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const lead = await prisma.lead.create({
        data: {
          name,
          email,
          phone,
          projectType,
          message,
        }
      });

      // Simulate email sending
      console.log(`[Email Simulation] New lead received from ${name} (${email}) for ${projectType}`);

      res.status(201).json({ success: true, lead });
    } catch (error) {
      console.error('Error creating lead:', error);
      res.status(500).json({ error: 'Failed to submit lead' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
