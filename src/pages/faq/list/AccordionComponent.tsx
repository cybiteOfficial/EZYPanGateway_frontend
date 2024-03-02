import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { BiChevronDown } from "react-icons/bi";
import { useDeleteFAQMutation } from "src/services/FAQService";
import { MdDeleteOutline } from "react-icons/md";
import { showToast } from "src/utils/toaster/showToast";
import { showConfirmationDialog } from "src/utils/showConfirmationDialog";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { RxPencil1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { AccessAction } from "src/utils/Enums/AccessAction";

function AccordionComponent({ items }: any) {
  const [deleteFaq] = useDeleteFAQMutation();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    showConfirmationDialog({
      title: "Delete Confirmation",
      text: "Are you sure you want to delete",
      icon: "question",
      showCancelButton: true,
      next: (result) => {
        if (result.isConfirmed) {
          deleteFaq(id).then((res: any) => {
            if (res.error) {
              showToast("error", res?.error?.data?.message);
            } else {
              if (res?.data?.status) {
                showToast("success", res?.data?.message);
              } else {
                showToast("error", res?.data?.message);
              }
            }
          });
        }
      },
    });
  };
  return (
    <div className="flex flex-col gap-3 px-3">
      {items.map((item: any, index: any) => (
        <Accordion className="shadow w-full" key={index}>
          <AccordionSummary
            expandIcon={<BiChevronDown className="w-6 h-6" />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <div className="px-2 font-semibold flex justify-between w-full">
              {item.question}

              <ATMMenu
              moduleName="FAQS"
                options={[
                  {

                    accessAction : AccessAction.EDIT,
                    label: (
                      <div className="flex gap-2 items-center text-secondary-main">
                        <RxPencil1 className="text-lg" /> Edit
                      </div>
                    ),
                    onClick: () => {
                      navigate(`/faq/${item._id}/edit`);
                    },
                  },
                  {
                    accessAction :AccessAction.DELETE,
                    label: (
                      <div className="flex gap-2 items-center text-red-600 font-semibold">
                        <MdDeleteOutline className="text-lg" /> Delete
                      </div>
                    ),
                    onClick: () => {
                      handleDelete(item._id);
                    },
                  },
                ]}
              />
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <p dangerouslySetInnerHTML={{__html:item.answer }}  className="px-2 "/> 
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default AccordionComponent;
