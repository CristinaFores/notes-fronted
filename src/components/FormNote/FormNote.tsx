import { useState } from "react";
import { useParams } from "react-router-dom";
import { Note } from "../../hooks/useNotes/types";
import useNotes from "../../hooks/useNotes/useNotes";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { InputLabelStyled } from "../Input/InputStyled";
import { TextSpanStyled } from "../Register/RegisterStyled";
import { FormNoteStyled } from "./FormNoteStyled";
interface FormNoteProps {
  isEdit?: boolean;
}

interface InitialNoteData {
  title: string;
  description: string;
  image: [];
  category: string;
}

const FormNote = ({ isEdit = false }: FormNoteProps): JSX.Element => {
  const { createNote, updateNote } = useNotes();
  const { id } = useParams();

  const initialNote: InitialNoteData = {
    title: "",
    description: "",
    image: [],
    category: "",
  };

  const [formNote, setFormNote] = useState(initialNote);

  const handleFileChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.id === "image") {
      const input = event.target as HTMLInputElement;
      const files = input.files as FileList;

      setFormNote({
        ...formNote,
        [event.target.name]: files[0],
      });
      return;
    }

    setFormNote({
      ...formNote,
      [event.target.id || event.target.value]:
        event.target.value || event.target.id,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataToSubmit = {
      title: formNote.title,
      description: formNote.description,
      image: formNote.image,
      category: formNote.category,
    };
    if (!isEdit) {
      await createNote(formDataToSubmit as Note);
      return;
    }
    await updateNote(formDataToSubmit as Note, id!);
  };

  return (
    <>
      <FormNoteStyled onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Titulo de la la publicacion"
          htmlFor="title"
          textLabel="Titulo de la la publicacion*"
          id="title"
          onChange={handleFileChange}
        />
        <InputLabelStyled htmlFor="description">
          Texto de la publicacion
        </InputLabelStyled>
        <textarea
          id="description"
          onChange={handleFileChange}
          defaultValue=""
        ></textarea>

        <Input
          type="file"
          name="image"
          placeholder="imagen"
          htmlFor="image"
          textLabel="Imagen"
          id="image"
          onChange={handleFileChange}
        />
        <label htmlFor="category">
          Categoria:
          <select onChange={handleFileChange} name="category" id="category">
            <option>Elige una opcion</option>

            <option value="personal">Personal</option>
            <option value="trabajo">Trabajo</option>
            <option value="estudio">Estudio</option>
            <option value="otro">Otros</option>
          </select>
        </label>

        <Button styleType="big" text="Publicar" ariaLabel="Publicar"></Button>
        <TextSpanStyled>
          <p>Los campos marcados con * son obligatorios</p>
        </TextSpanStyled>
      </FormNoteStyled>
    </>
  );
};

export default FormNote;
