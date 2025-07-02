import "../style/error.less";

export const Error = () => {
  return (
    <div className="no-data" data-testid="error">
      <h1>Wystąpił błąd podczas pobierania danych</h1>
      <p>Spróbuj jeszcze raz.</p>
      <button onClick={() => window.location.reload()}>Odśwież</button>
    </div>
  );
};

export const Empty = () => {
  return (
    <div className="no-data" data-testid="error">
      <h1>Brak Danych</h1>
      <p>Spróbuj jeszcze raz.</p>
      <button onClick={() => window.location.reload()}>Odśwież</button>
    </div>
  );
};
