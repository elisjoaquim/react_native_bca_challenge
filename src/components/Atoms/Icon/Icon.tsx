import { icons, LucideProps } from 'lucide-react-native';

const Icon = ({
  name,
  strokeWidth = 1.5,
  ...rest
}: LucideProps & { name: keyof typeof icons }) => {
  const LucideIcon = icons[name];

  return <LucideIcon strokeWidth={strokeWidth} {...rest} />;
};

export default Icon;
