interface DashboardInfoCardProps {
  title: string;
  value: number;
  theme: string;
}

const DashboardInfoCard: React.FC<DashboardInfoCardProps> = ({
  title,
  value = 0,
  theme,
}) => {
  return (
    <div
      className={`grid w-full flex-grow basis-[300px] gap-4 border p-4 ${
        theme === 'green'
          ? 'border-green-500 bg-green-50'
          : theme === 'red'
            ? 'border-red-500 bg-red-50'
            : 'border-orange-500 bg-orange-50'
      }`}
    >
      <p
        className={`text-3xl font-semibold ${theme === 'green' ? 'text-green-950' : 'text-orange-950'}`}
      >
        {title}
      </p>
      <span
        className={`text-5xl font-black ${theme === 'green' ? 'text-green-950' : 'text-orange-950'}`}
      >
        {value}
      </span>
    </div>
  );
};

export default DashboardInfoCard;
