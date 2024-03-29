import { Draggable } from "react-beautiful-dnd";
import { Note } from "../../hooks/useNotes/types";
import CardNote from "../CardNote/CardNote";
import { getItemStyle } from "../Trello/TrelloStyled";
import { ListNotesStyled } from "./ListNotesStyled";

interface ListNotesProps {
  item: Note;
  index: number;
  deleteNoteList: (id: string) => void;
}

const ListNotes = ({
  item,
  index,
  deleteNoteList,
}: ListNotesProps): JSX.Element => {
  return (
    <>
      <ListNotesStyled>
        <Draggable key={item.id} draggableId={item.id!} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style,
                item.category!
              )}
            >
              <CardNote
                id={item.id}
                title={item.title}
                description={item.description}
                date={item.date}
                category={item.category}
                handleDeleteNote={() => deleteNoteList(item.id!)}
              />
            </div>
          )}
        </Draggable>
      </ListNotesStyled>
    </>
  );
};

export default ListNotes;
