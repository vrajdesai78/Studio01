interface ButtonWithIconProps {
  children: React.ReactNode;
  onClick: () => void;
  
}

const ButtonWithIcon = ({ children, onClick }: ButtonWithIconProps) => {
  return (
    <button onClick={onClick} className="bg-gray-600/50 p-2.5 rounded-lg">
      {children}
    </button>
  );
};

export default ButtonWithIcon;
