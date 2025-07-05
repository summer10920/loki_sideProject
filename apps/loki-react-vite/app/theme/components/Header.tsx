import { FaReact } from 'react-icons/fa';
import { useLokiTheme } from '../hooks/useLokiTheme';
import { renderToStaticMarkup } from 'react-dom/server';
import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const iconToSvgUrl = (
  IconComponent: React.ComponentType<any>,
  color = '#fff'
) => {
  const iconElement = <IconComponent style={{ color }} />;
  const svgString = renderToStaticMarkup(iconElement);
  return `url('data:image/svg+xml;utf8,${encodeURIComponent(svgString)}')`;
};

const StyledMaterialUISwitch = styled(Switch)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    width: 35,
    height: 22,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(0%)',
      transition: theme.transitions.create(['transform'], {
        duration: theme.transitions.duration.standard,
      }),
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(10px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: iconToSvgUrl(MdDarkMode, '#fff'),
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#5d99d5',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: isDark ? '#3F51B5' : '#FF8F00',
      width: 20,
      height: 20,
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.standard,
      }),
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: iconToSvgUrl(MdLightMode, '#fff'),
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: '#ffd99f',
      borderRadius: 20 / 2,
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.standard,
      }),
    },
  };
});

export const Header = () => {
  const { isDark, toggleTheme } = useLokiTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-100 dark:bg-gray-800 shadow flex items-center justify-between px-4 z-50">
      <FaReact className="h-10 w-10 text-[#61dafb]" />
      <h1 className="text-2xl font-semibold">Loki-Website</h1>
      <nav className="flex items-center gap-4">
        <StyledMaterialUISwitch checked={isDark} onChange={toggleTheme} />
      </nav>
    </header>
  );
};
