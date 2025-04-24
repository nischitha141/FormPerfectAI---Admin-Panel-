import { FC, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  title: string;
  description?: string;
  iconSrc?: string;
  iconAlt?: string;
  centerLayout?: boolean;
}

const AuthLayout: FC<Props> = ({ children, title, description, iconSrc, iconAlt, centerLayout = false }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="FormPerfect AI Logo"
            width={64}
            height={64}
            className="w-16 h-16"
          />
          <span className="text-[16px] font-bold font-['Plus_Jakarta_Sans'] text-gray-900">FormPerfect AI</span>
        </Link>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0px_16px_32px_-12px_#585C5F1A] rounded-[24px] sm:px-10">
          {centerLayout ? (
            <div className="flex flex-col items-center text-center mb-6">
              <Image
                src={iconSrc || '/avatar.svg'}
                alt={iconAlt || 'Avatar'}
                width={88}
                height={88}
                className="w-22 h-22 mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
              {description && (
                <p className="text-sm text-gray-500 mt-2">{description}</p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={iconSrc || '/avatar.svg'}
                alt={iconAlt || 'Avatar'}
                width={88}
                height={88}
                className="w-22 h-22 mb-4"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
                {description && (
                  <p className="text-sm text-gray-500">{description}</p>
                )}
              </div>
            </div>
          )}
          <style jsx global>{`
            .auth-label {
              font-family: 'Urbanist';
              font-weight: 600;
              font-size: 14px;
              line-height: 100%;
              letter-spacing: -0.2%;
              vertical-align: middle;
              display: inline-block;
              margin-bottom: 8px;
            }

            .auth-input-container {
              position: relative;
              margin-bottom: 16px;
            }

            .auth-input-icon {
              position: absolute;
              left: 12px;
              top: 50%;
              transform: translateY(-50%);
              color: #9CA3AF;
              pointer-events: none;
            }

            .auth-input {
              width: 100%;
              padding: 12px 12px 12px 40px;
              border: 1px solid #E5E7EB;
              border-radius: 8px;
              font-family: 'Urbanist';
              font-size: 14px;
              line-height: 20px;
              color: #111827;
              background-color: #FFFFFF;
              transition: all 0.2s ease-in-out;
            }

            .auth-input:focus {
              outline: none;
              border-color: #3B82F6;
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }

            .auth-input::placeholder {
              color: #9CA3AF;
            }

            .auth-input-error {
              border-color: #EF4444;
            }

            .auth-input-error:focus {
              border-color: #EF4444;
              box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }

            .auth-input-help-text {
              margin-top: 4px;
              font-size: 12px;
              line-height: 16px;
              color: #6B7280;
            }
          `}</style>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;