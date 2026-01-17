'use client';


interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
  xl: 'w-12 h-12 border-4',
};

const variantClasses = {
  primary: 'border-purple-500 border-t-transparent',
  secondary: 'border-blue-500 border-t-transparent',
  white: 'border-white border-t-transparent',
};

export function Spinner({
  size = 'md',
  variant = 'primary',
  className = ''
}: SpinnerProps) {
  return (
    <div
      className={`
        inline-block animate-spin rounded-full
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      role="status"
      aria-label="loading"
    />
  );
}

export default Spinner;
