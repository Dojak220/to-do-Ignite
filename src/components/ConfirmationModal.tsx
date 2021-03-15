// import { useContext } from "react";
// import { ChallengesContext } from "../contexts/ChallengesContext";
// import styles from "../styles/components/LevelUpModal.module.css";
import { useState } from "react";
import "../styles/confirmationModal.scss";

interface ConfirmationModalProps {
   setIsConfirmationModalOpen: (isModalOpen: boolean) => void;
   handleRemoveTask: () => void;
}

export function ConfirmationModal(props: ConfirmationModalProps) {
   // const { confirmation, confirmationModal } = useContext(ChallengesContext);

   return (
      <div className="overlay">
         <div className="container">
            <p> Tem certeza que quer excluir essa tarefa? Essa ação não poderá ser desfeita.</p>

            <button
               type="button"
               onClick={
                  () => {
                     props.handleRemoveTask()
                     props.setIsConfirmationModalOpen(false)
                  }
               }
            >
               Confirmar
            </button>
         </div>
      </div>
   );
}