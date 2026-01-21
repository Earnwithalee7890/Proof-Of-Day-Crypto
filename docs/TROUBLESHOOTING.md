# Troubleshooting Guide

## Common Issues

### Build Errors

#### Module not found
```
Error: Cannot find module 'xyz'
```
**Solution**: Run `npm install` to install dependencies.

#### TypeScript errors
```
Type error: Property 'x' does not exist
```
**Solution**: Check type definitions and ensure imports are correct.

### Runtime Issues

#### Supabase Connection Failed
- Verify `NEXT_PUBLIC_SUPABASE_URL` is set correctly
- Check network connectivity
- Confirm API keys are valid

#### Farcaster SDK Not Initializing
- Ensure running within a Farcaster frame environment
- Check for browser console errors
- Verify SDK version compatibility

### Development

#### Hot Reload Not Working
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

#### Vercel Deployment Failed
1. Check build logs
2. Verify environment variables
3. Ensure dependencies are up to date
