import "../style/placeholder.less";

const MobileTablePlacecholder = ({
  fieldsCount = 10,
}: {
  fieldsCount?: number;
}) => {
  return (
    <div className="cards">
      {Array.from({ length: 10 }).map((_, cardIndex) => (
        <div className="card" key={cardIndex}>
          {Array.from({ length: fieldsCount }).map((_, fieldIndex) => (
            <div key={fieldIndex} className="card-row">
              <strong className="skeleton skeleton-value" />{" "}
              <div className="skeleton skeleton-value" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MobileTablePlacecholder;
