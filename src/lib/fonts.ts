// Fontes disponíveis para uso no aplicativo
import { Inter, Roboto, Open_Sans, Source_Code_Pro, Fira_Code, JetBrains_Mono } from 'next/font/google';

// Configuração das fontes
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code',
  display: 'swap',
});

export const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

// Classes CSS para uso direto
export const fontClasses = {
  inter: 'font-inter',
  roboto: 'font-roboto',
  openSans: 'font-open-sans',
  sourceCode: 'font-source-code',
  firaCode: 'font-fira-code',
  jetbrains: 'font-jetbrains',
  geistSans: 'font-geist-sans',
  geistMono: 'font-geist-mono',
  serif: 'font-serif',
  sans: 'font-sans',
  mono: 'font-mono',
};