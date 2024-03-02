import React from "react";
import { ErrorMessage, FormikProps } from "formik";
import { FormInitialValues } from "./ReplyDialogWrapper";
import ATMLoadingButton from "src/components/UI/atoms/ATMLoadingButton/ATMLoadingButton";
import { MdEmail } from "react-icons/md";
import ATMHTMLEditor from "src/components/UI/atoms/formFields/ATMHTMLEditor/ATMHTMLEditor";

type Props = {
  formikProps: FormikProps<FormInitialValues>;
  onClose: () => void;
};

const ReplyDialog = ({ formikProps, onClose }: Props) => {
  const { values, setFieldValue, isSubmitting } = formikProps;

  return (
    <div className="flex flex-col gap-2">
      <div className="pb-11 flex flex-col gap-2">
        <div className="flex items-center border border-gray-300 rounded-md px-1 py-1">
          <div className="bg-slate-200 w-20 px-1 py-1 text-center rounded-l-md cursor-pointer hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:border-blue-400">
            To
          </div>
          <div className="flex-1">
            <input 
            disabled={true}
              type="email"
              name="to"
              value={values.to}
              onChange={(e) => setFieldValue("to", e.target.value)}
              className="w-full px-1 py-1 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Recipients"
            />
            <ErrorMessage name="to">
              {(errMsg) => (
                <p className="font-poppins absolute text-[12px] text-start mt-0 text-red-500  ">
                  {" "}
                  {errMsg}{" "}
                </p>
              )}
            </ErrorMessage>
          </div>
        </div>

        <div className="flex items-center border border-gray-300 rounded-md px-1 py-1">
          <div className="bg-slate-200 w-20 px-1 py-1 text-center rounded-l-md cursor-pointer hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:border-blue-400">
            Subject
          </div>
          <div className="flex-1">
            <input
              name="subject"
              value={values.subject}
              onChange={(e) => setFieldValue("subject", e.target.value)}
              className="w-full px-1 py-1 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Subject"
            />
            <ErrorMessage name="subject">
              {(errMsg) => (
                <p className="font-poppins absolute text-[12px] text-start mt-0 text-red-500  ">
                  {" "}
                  {errMsg}{" "}
                </p>
              )}
            </ErrorMessage>
          </div>
        </div>

        <div className="w-full px-1 py-1  grid grid-cols-1 gap-5">
          <ATMHTMLEditor
            name="emailBody"
            placeholder="Write Message"
            value={values.emailBody}
            onChange={(newValue) => {
              setFieldValue("emailBody", newValue);
            }}
          />
        </div>
      </div>

      <div className="flex bottom-0 right-0 p-3  justify-end gap-3 absolute bg-white z-50 w-full">
        <ATMLoadingButton
          className="border-primary-main text-primary-main bg-white"
          onClick={onClose}
        >
          Discard
        </ATMLoadingButton>

        <ATMLoadingButton
          type="submit"
          isLoading={isSubmitting}
          className="bg-primary-main"
          loadingText="Sending..."
        >
          <div className=" font-medium  flex items-center">
            <MdEmail className="mr-2" />
            <span>Send Message</span>
          </div>
        </ATMLoadingButton>
      </div>
    </div>
  );
};

export default ReplyDialog;
