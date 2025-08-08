# MFEC Resource Allocation System

A comprehensive resource allocation and project management system built with modern web technologies. This application helps organizations manage projects, allocate resources efficiently, and track progress through intuitive dashboards and analytics.

## 🚀 Features

### 📊 Dashboard & Analytics
- **Real-time KPI Monitoring** - Track key performance indicators with interactive charts
- **Resource Timeline View** - Visualize resource allocation across projects
- **Project Health Metrics** - Monitor project status and at-risk projects
- **Allocation Analytics** - Donut charts and bar charts for resource distribution

### 👥 Resource Management
- **Team Management** - Organize teams and manage team members
- **Resource Allocation** - Assign resources to projects with timeline tracking
- **Skill-based Matching** - Match resources based on skills and availability
- **Capacity Planning** - Optimize resource utilization across projects

### 📁 Project Management
- **Project Dashboard** - Comprehensive project overview and management
- **Project Proposals** - Handle project requests and approvals
- **Status Tracking** - Monitor project execution and milestones
- **Import/Export** - Bulk project data management

### 🗓️ Calendar & Scheduling
- **Resource Calendar** - View resource schedules and availability
- **Project Timeline** - Gantt-style project planning
- **Conflict Detection** - Identify resource conflicts automatically

### ⚙️ Administration
- **User Management** - Role-based access control
- **System Settings** - Configure application preferences
- **Data Import** - Bulk data import capabilities
- **Authentication** - Secure user authentication system

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **Recharts** - Data visualization and charting

### Development Tools
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing and optimization

### Key Libraries
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form management
- **Date-fns** - Date utility library
- **Class Variance Authority** - Component styling patterns

## 🏁 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tongthong-nnk/mfec-resource-allocation.git
   cd mfec-resource-allocation
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Code linting
pnpm lint
```

## 📁 Project Structure

```
mfec-resource-allocation/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (app)/             # Main application routes
│   │   │   ├── admin/         # Administration pages
│   │   │   ├── calendar/      # Calendar functionality
│   │   │   ├── dashboard/     # Main dashboard
│   │   │   ├── projects/      # Project management
│   │   │   ├── proposals/     # Project proposals
│   │   │   ├── resources/     # Resource management
│   │   │   ├── settings/      # Application settings
│   │   │   └── teams/         # Team management
│   │   ├── (auth)/            # Authentication pages
│   │   │   └── login/         # Login page
│   │   └── api/               # API routes
│   │       └── auth/          # Authentication API
│   ├── components/            # React components
│   │   ├── ui/                # UI components (shadcn/ui)
│   │   ├── charts/            # Chart components
│   │   └── [feature-components] # Feature-specific components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions and data
│   └── styles/                # Global styles
├── public/                    # Static assets
└── [config-files]            # Configuration files
```

## 🎨 Design System

### Color Palette
- **Primary**: Premium purple gradient theme
- **Charts**: Monochromatic purple gradients for data visualization
- **UI**: Neutral theme with professional appearance
- **Responsive**: Mobile-first design approach

### Components
- Built with **shadcn/ui** for consistency
- **Accessible** components following WCAG guidelines
- **Responsive** design for all screen sizes
- **Dark/Light** mode support

## 🔧 Configuration

### Environment Setup
Create `.env.local` file for environment variables:
```env
# Add your environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Tailwind Configuration
Custom theme configuration in `tailwind.config.ts` with:
- Brand colors and gradients
- Component-specific styling
- CSS variables integration

## 📈 Key Metrics & KPIs

The system tracks various metrics including:
- **Resource Utilization** - Percentage of resource allocation
- **Project Health** - Status indicators and risk assessment  
- **Timeline Adherence** - Project delivery tracking
- **Team Performance** - Productivity and efficiency metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About MFEC

This Resource Allocation System is designed for MFEC (Mahidol University Faculty of Engineering Computing), providing efficient project and resource management capabilities for educational and research environments.

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation in `/docs` (coming soon)

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**