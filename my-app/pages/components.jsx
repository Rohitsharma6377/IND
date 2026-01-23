import React, { useState } from 'react';
import { Link } from 'indjs';

// Import UI Components
import Button, { IconButton } from '../components/ui/Button';
import Badge, { StatusBadge } from '../components/ui/Badge';
import Card, { FeatureCard, StatsCard } from '../components/ui/Card';
import Input, { Textarea, Toggle, SearchInput } from '../components/ui/Input';
import Alert from '../components/ui/Alert';
import Tabs, { SegmentedControl } from '../components/ui/Tabs';
import Avatar, { AvatarGroup } from '../components/ui/Avatar';
import Progress, { CircularProgress, Steps, Spinner } from '../components/ui/Progress';
import { FAQAccordion } from '../components/ui/Accordion';
import Tooltip from '../components/ui/Tooltip';
import {
  Zap, Shield, Code, Database, Globe, Rocket,
  ArrowRight, Check, Heart, Star, Github,
  Mail, Bell, Search, Settings
} from '../components/ui/Icons';

// Section wrapper component
const Section = ({ title, description, children }) => (
  <section className="mb-20">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
      {description && <p className="text-gray-500 mt-2">{description}</p>}
    </div>
    {children}
  </section>
);

export default function Components() {
  const [inputValue, setInputValue] = useState('');
  const [toggleValue, setToggleValue] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [activeSegment, setActiveSegment] = useState('all');

  const faqItems = [
    { question: 'How do I install INDJS?', answer: 'Run npx indjs create my-app in your terminal to create a new INDJS project.' },
    { question: 'Can I use TypeScript?', answer: 'Yes! INDJS has first-class TypeScript support out of the box.' },
    { question: 'Is INDJS production ready?', answer: 'Absolutely! INDJS is used in production by many companies.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-100/60 via-purple-100/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-100/50 via-blue-100/30 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-sm font-semibold text-indigo-700">50+ Components</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              UI Component
              <span className="block gradient-text">Library</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Beautiful, accessible, and customizable React components. 
              Built with Tailwind CSS and modern design principles.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Buttons Section */}
        <Section title="Buttons" description="Interactive button components with multiple variants, sizes, and states.">
          <Card padding="lg" className="space-y-8">
            {/* Variants */}
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Variants</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="gradient">Gradient</Button>
                <Button variant="primary" loading>Loading</Button>
                <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                  With Icon
                </Button>
              </div>
            </div>
            
            {/* Sizes */}
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Sizes</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>
            
            {/* Icon Buttons */}
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Icon Buttons</p>
              <div className="flex items-center gap-3">
                <Tooltip content="Like this!">
                  <IconButton variant="ghost"><Heart size={20} /></IconButton>
                </Tooltip>
                <Tooltip content="Star it!">
                  <IconButton variant="ghost"><Star size={20} /></IconButton>
                </Tooltip>
                <Tooltip content="Settings">
                  <IconButton variant="ghost"><Settings size={20} /></IconButton>
                </Tooltip>
                <Tooltip content="Notifications">
                  <IconButton variant="secondary"><Bell size={20} /></IconButton>
                </Tooltip>
              </div>
            </div>
          </Card>
        </Section>

        {/* Badges Section */}
        <Section title="Badges" description="Status indicators and labels for categorization.">
          <Card padding="lg" className="space-y-8">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Variants</p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="gradient">Gradient</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">With Features</p>
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="success" dot>With Dot</Badge>
                <Badge variant="primary" icon={<Zap size={14} />}>With Icon</Badge>
                <Badge variant="danger" removable onRemove={() => {}}>Removable</Badge>
                <StatusBadge status="online" />
                <StatusBadge status="away" />
                <StatusBadge status="busy" />
              </div>
            </div>
          </Card>
        </Section>

        {/* Cards Section */}
        <Section title="Cards" description="Container components for grouping related content.">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <FeatureCard
              icon={<Zap size={24} />}
              title="Lightning Fast"
              description="Built on esbuild for instant HMR and sub-second builds."
              href="#"
            />
            <FeatureCard
              icon={<Shield size={24} />}
              title="Secure by Default"
              description="Built-in security features and authentication."
              href="#"
            />
            <FeatureCard
              icon={<Globe size={24} />}
              title="Universal Platform"
              description="Deploy to Web, Desktop, and Mobile."
              href="#"
            />
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <StatsCard
              label="Total Users"
              value="12,345"
              change="+12.5%"
              changeType="positive"
              icon={<Globe size={20} />}
            />
            <StatsCard
              label="Revenue"
              value="$45,678"
              change="+8.2%"
              changeType="positive"
              icon={<Star size={20} />}
            />
            <StatsCard
              label="Bounce Rate"
              value="23.4%"
              change="-2.1%"
              changeType="positive"
              icon={<Rocket size={20} />}
            />
            <StatsCard
              label="Avg. Time"
              value="4m 32s"
              change="+0.3%"
              changeType="neutral"
              icon={<Code size={20} />}
            />
          </div>
        </Section>

        {/* Inputs Section */}
        <Section title="Form Inputs" description="Text fields, toggles, and other input components.">
          <Card padding="lg" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Email Address"
                placeholder="you@example.com"
                icon={<Mail size={20} />}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                hint="Must be at least 8 characters"
              />
              <Input
                label="With Error"
                placeholder="Enter value"
                error="This field is required"
              />
              <SearchInput
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search components..."
              />
            </div>
            <div>
              <Textarea
                label="Message"
                placeholder="Write your message here..."
                rows={3}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Toggle Switches</p>
              <div className="flex flex-wrap items-center gap-8">
                <Toggle
                  label="Enable notifications"
                  checked={toggleValue}
                  onChange={(e) => setToggleValue(e.target.checked)}
                />
                <Toggle
                  label="Dark mode"
                  checked={false}
                  onChange={() => {}}
                  size="sm"
                />
              </div>
            </div>
          </Card>
        </Section>

        {/* Alerts Section */}
        <Section title="Alerts" description="Contextual feedback messages for user actions.">
          <div className="space-y-4">
            <Alert variant="success" title="Success!" dismissible>
              Your changes have been saved successfully.
            </Alert>
            <Alert variant="error" title="Error">
              Something went wrong. Please try again.
            </Alert>
            <Alert variant="warning" title="Warning">
              Your session will expire in 5 minutes.
            </Alert>
            <Alert variant="info" title="Information">
              A new version is available. Refresh to update.
            </Alert>
          </div>
        </Section>

        {/* Tabs Section */}
        <Section title="Tabs & Segmented Control" description="Organize content into switchable panels.">
          <Card padding="lg" className="space-y-10">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Tabs</p>
              <Tabs
                tabs={[
                  { label: 'Overview', icon: <Globe size={16} />, content: <p className="text-gray-600 py-4">Overview content goes here. This tab contains general information.</p> },
                  { label: 'Features', icon: <Zap size={16} />, content: <p className="text-gray-600 py-4">Features content goes here. Explore all available features.</p> },
                  { label: 'Pricing', icon: <Star size={16} />, badge: 'New', content: <p className="text-gray-600 py-4">Pricing content goes here. View our pricing plans.</p> },
                ]}
                variant="default"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Segmented Control</p>
              <SegmentedControl
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Active', value: 'active' },
                  { label: 'Archived', value: 'archived' },
                ]}
                value={activeSegment}
                onChange={setActiveSegment}
              />
            </div>
          </Card>
        </Section>

        {/* Avatars Section */}
        <Section title="Avatars" description="User profile images and groups.">
          <Card padding="lg" className="space-y-8">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Sizes & Variants</p>
              <div className="flex flex-wrap items-end gap-4">
                <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" size="xs" />
                <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" size="sm" />
                <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" size="md" />
                <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" size="lg" />
                <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" size="xl" />
                <Avatar name="John Doe" size="lg" color="indigo" />
                <Avatar name="Jane Smith" size="lg" color="pink" />
                <Avatar size="lg" status="online" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Avatar Group</p>
              <AvatarGroup
                avatars={[
                  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
                  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
                  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
                  { name: 'Alex Kim' },
                  { name: 'Sarah Johnson' },
                  { name: 'Mike Brown' },
                ]}
                max={4}
                size="md"
              />
            </div>
          </Card>
        </Section>

        {/* Progress Section */}
        <Section title="Progress & Loading" description="Visual indicators for progress and loading states.">
          <Card padding="lg" className="space-y-10">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Progress Bars</p>
              <div className="space-y-4">
                <Progress value={25} variant="primary" showLabel />
                <Progress value={50} variant="success" />
                <Progress value={75} variant="gradient" size="lg" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Circular & Spinners</p>
              <div className="flex items-center gap-8">
                <CircularProgress value={65} />
                <CircularProgress value={85} variant="success" />
                <Spinner size="lg" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Steps</p>
              <Steps
                steps={[
                  { label: 'Account' },
                  { label: 'Details' },
                  { label: 'Payment' },
                  { label: 'Complete' },
                ]}
                currentStep={2}
              />
            </div>
          </Card>
        </Section>

        {/* Accordion Section */}
        <Section title="FAQ Accordion" description="Expandable content sections for FAQs and more.">
          <FAQAccordion items={faqItems} />
        </Section>

        {/* Icons Section */}
        <Section title="SVG Icons" description="70+ crisp SVG icons for every use case.">
          <Card padding="lg">
            <p className="text-gray-500 mb-6 leading-relaxed">
              All icons are SVG-based for crisp rendering at any size. Customize color, size, and stroke width.
            </p>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-15 gap-3">
              {[
                Zap, Shield, Code, Database, Globe, Rocket,
                ArrowRight, Check, Heart, Star, Github,
                Mail, Bell, Search, Settings
              ].map((Icon, idx) => (
                <div
                  key={idx}
                  className="group flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 cursor-pointer hover:shadow-md hover:shadow-indigo-100 hover:scale-110"
                >
                  <Icon size={22} className="group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* CTA */}
        <section className="relative text-center py-20 mt-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl mx-4"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-30 rounded-3xl mx-4"></div>
          
          <div className="relative">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Ready to build something amazing?
            </h2>
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
              Start using these components in your INDJS project today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/docs">
                <Button variant="gradient" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                  View Documentation
                </Button>
              </Link>
              <a href="https://github.com/Rohitsharma6377/IND" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg" icon={<Github size={18} />}>
                  GitHub
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
