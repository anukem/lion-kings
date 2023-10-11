import { NotePage } from "./NotePage";

interface Props {
  noteIds: string[];
}

export function Notes(props: Props) {
  const { noteIds } = props;
  const actualNotes = noteIds.slice(-3);
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {actualNotes.map((noteId, index) => {
              return (
                <div
                  style={{
                    padding: "10px",
                    height: "800px",
                    width: "600px",
                    background: "beige",
                    marginLeft: "-30px",
                    zIndex: index + 1,
                    boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.5)",
                    border: "1px solid black",
                    borderRadius: "5px",
                  }}
                  key={noteId}
                >
                  <NotePage noteId={noteId} />
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
