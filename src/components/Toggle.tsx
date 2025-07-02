import "../style/toggle.less";

type ToggleProps = {
  toggled: boolean;
  dataTestId?: string;
  onToggle: (newValue: boolean) => void;
};

export default function Toggle({ toggled, dataTestId, onToggle }: ToggleProps) {
  return (
    <label className="toggle" data-testid="toggle">
      <input
        id="mobileLayoutCheckbox"
        type="checkbox"
        data-testid={dataTestId}
        checked={toggled}
        onChange={() => onToggle(!toggled)}
        className="toggle-input"
      />
      <div
        data-testid={`${dataTestId}Toggle`}
        className={`toggle-slider ${toggled ? "toggled" : ""}`}></div>
    </label>
  );
}
