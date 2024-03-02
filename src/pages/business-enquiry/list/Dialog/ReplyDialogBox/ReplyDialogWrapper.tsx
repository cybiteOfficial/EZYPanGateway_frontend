import React from "react";
import { object, string } from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import ReplyDialog from "./ReplyDialog";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { EditorState as EditorStateType } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { convertToRaw, EditorState } from "draft-js";
import { useEnquiryReplyMutation } from "src/services/EnquiiryReplyService";
import { showToast } from "src/utils/toaster/showToast";

type Props = {
  onClose: () => void;
  businessEnquiryData: { id: string; email: string } | null;
};

export type FormInitialValues = {
  subject: string;
  emailBody: EditorStateType;
  to: string;
};
const ReplyDialogWrapper = ({ onClose, businessEnquiryData }: Props) => {
  const [loanEnquiryReply] = useEnquiryReplyMutation();

  // Form Initial Values
  const initialValues: FormInitialValues = {
    to: businessEnquiryData?.email || "",
    subject: "",
    emailBody: EditorState.createEmpty(),
  };

  // Form Validation Schema
  const validationSchema = object({
    emailBody: object()
      .test("has text", "Message is required", (value: any) => {
        return value.getCurrentContent().hasText();
      })
      .required("Message is required"),
    subject: string().required("Please enter Subject"),
    to: string()
      .email("Email must be valid")
      .trim()
      .required("Email is required"),
  });

  //   Form Submit Handler
  const handleSubmit = (
    values: FormInitialValues,
    { setSubmitting }: FormikHelpers<FormInitialValues>
  ) => {
    const formattedValues = {
      ...values,
      emailBody: draftToHtml(
        convertToRaw(values.emailBody.getCurrentContent())
      ),
    };
    loanEnquiryReply(formattedValues).then((res: any) => {
      if (res?.error) {
        showToast("error", res?.error?.data?.message);
        setSubmitting(false);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          setSubmitting(false);
         onClose();
        } else {
          showToast("error", res?.data?.message);
          setSubmitting(false);
        }
      }
    });
  };

  return (
    <Dialog open={true} maxWidth="lg" fullWidth>
      <DialogTitle>
        <div className="pb-3 border-b font-medium border-secondary-main flex justify-between">
          <div className=" flex items-center">
            <AiOutlineMail className="font-medium mr-2" />
            Compose New Message
          </div>
          <button onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              <ReplyDialog formikProps={formikProps} onClose={onClose} />
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyDialogWrapper;
