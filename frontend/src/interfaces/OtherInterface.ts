export interface InputBoxProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export interface PageProps {
    params: Record<string, any>;
    searchParams: URLSearchParams;
}
