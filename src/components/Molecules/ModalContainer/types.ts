export interface IModalContainerProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  showCloseButton?: boolean;
}
