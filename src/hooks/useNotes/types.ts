export interface Note {
  id?: string;
  owner?: {
    username: string;
    id?: string;
  };
  title: string;
  description: string;
  date?: string;
  buckpicture?: string[];
  image?: File[] | string[];
  category?: string;
  status?: string;
}

export interface UiState {
  modal: {
    text: string;
    showModal: boolean;
    isError: boolean;
  };
  isLoading: boolean;
}
