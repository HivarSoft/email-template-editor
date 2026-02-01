# Email Template Editor

A complete React email template editor with Material-UI theming, drag-and-drop functionality, and real-time preview.

## Features

- 🎨 **Complete Material-UI Integration** - Purple-themed design system
- 📧 **Email Template Building** - Drag-and-drop email components
- 🔧 **Editable Template Names** - Inline editing with auto-save
- 🎯 **Variable Management** - Dynamic content with variable extraction
- 📱 **Responsive Design** - Works on desktop and mobile
- 🌐 **SSR Compatible** - Works with Next.js and other SSR frameworks
- ⚡ **Built with Vite** - Fast development and optimized builds

## Installation

```bash
npm install @devhiteshk/email-template-editor
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled @mui/icons-material
```

## Usage

### Basic Usage

```tsx
import React from 'react';
import { EmailTemplateEditor } from '@devhiteshk/email-template-editor';

function App() {
  const handleSave = (blockTemplate, htmlTemplate, variables, templateName) => {
    console.log('Template saved:', {
      blockTemplate,
      htmlTemplate,
      variables,
      templateName
    });
  };

  return (
    <EmailTemplateEditor
      templateName="My Newsletter"
      onSave={handleSave}
    />
  );
}
```

### SSR Usage (Next.js)

```tsx
import React from 'react';
import { ClientOnlyEmailTemplateEditor } from '@devhiteshk/email-template-editor';

export default function EmailBuilderPage() {
  const handleSave = (blockTemplate, htmlTemplate, variables, templateName) => {
    // Save to your backend
    fetch('/api/templates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blockTemplate, htmlTemplate, variables, templateName })
    });
  };

  return (
    <ClientOnlyEmailTemplateEditor
      templateName="Newsletter Template"
      onSave={handleSave}
    />
  );
}
```

### With Initial Template

```tsx
import React from 'react';
import { EmailTemplateEditor } from '@devhiteshk/email-template-editor';

const initialTemplate = {
  // Your template configuration
};

function App() {
  return (
    <EmailTemplateEditor
      template={initialTemplate}
      templateName="Welcome Email"
      onSave={(blockTemplate, htmlTemplate, variables, templateName) => {
        // Handle save
      }}
    />
  );
}
```

## API Reference

### EmailTemplateEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `template` | `TEditorConfiguration` | `undefined` | Initial template configuration |
| `templateName` | `string` | `"Untitled Template"` | Initial template name |
| `onSave` | `function` | `undefined` | Callback when template is saved |

### onSave Callback

```tsx
onSave?: (
  blockTemplate: TEditorConfiguration,
  htmlTemplate: string,
  variables: Record<string, string>,
  templateName: string
) => void
```

- `blockTemplate`: The block-based template configuration
- `htmlTemplate`: Generated HTML string
- `variables`: Extracted variables from the template
- `templateName`: Current template name

## Components

### EmailTemplateEditor
Main component for client-side applications.

### ClientOnlyEmailTemplateEditor
SSR-safe wrapper that only renders on the client side. Use this for Next.js and other SSR frameworks.

## Styling

The editor comes with a complete purple-themed Material-UI design system. All components are styled consistently and follow Material Design principles.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Name]

## Support

If you encounter any issues, please file them on the [GitHub issues page](https://github.com/devhiteshk/email-template-editor/issues).