# UI Components Guide

## Button Variants
- `primary` - Main action buttons
- `secondary` - Secondary actions
- `outline` - Less prominent actions
- `ghost` - Minimal styling
- `danger` - Destructive actions

## Sizes
- `sm` - Small (24px height)
- `md` - Medium (32px height)
- `lg` - Large (40px height)
- `xl` - Extra large (48px height)

## Card Components
Use `Card`, `CardHeader`, `CardContent`, `CardFooter` for consistent layouts.

## Modal Usage
```tsx
<Modal isOpen={isOpen} onClose={handleClose}>
  <ModalHeader>Title</ModalHeader>
  <ModalBody>Content</ModalBody>
  <ModalFooter>
    <Button onClick={handleClose}>Close</Button>
  </ModalFooter>
</Modal>
```

## Toast Notifications
Use the `toast` utility:
```tsx
toast.success('Operation completed');
toast.error('Something went wrong');
```
