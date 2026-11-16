export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field name → first error message. */
  fieldErrors?: Record<string, string>;
  /** Values echoed back so a failed submit keeps what the visitor typed. */
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };
