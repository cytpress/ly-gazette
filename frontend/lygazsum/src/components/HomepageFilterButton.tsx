import getCommitteeTag from "@/utils/getCommitteeTag";

interface HomepageFilterButtonProps {
  committeeName: string;
  onToggle: (committeeName: string) => void;
  isSelected: boolean;
}

export function HomepageFilterButton({
  committeeName,
  onToggle,
  isSelected,
}: HomepageFilterButtonProps) {
  const tagInfo = getCommitteeTag(committeeName);
  const { shortName, bgColor, hoverBorderColor, selectedBorderColor } = tagInfo;
  const defaultClasses = `rounded-xl px-3 py-1 border-2 border-neutral-200 bg-white transition-all duration-300 ease-in-out  ${hoverBorderColor}`;
  const selectedClasses = `rounded-xl px-3 py-1 border-2 transition-all duration-300 ease-in-out  ${hoverBorderColor} ${selectedBorderColor} ${bgColor}`;

  return (
    <button
      onClick={() => onToggle(committeeName)}
      className={isSelected ? selectedClasses : defaultClasses}
    >
      {shortName}
    </button>
  );
}
