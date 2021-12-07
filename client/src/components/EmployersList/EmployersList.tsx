import {  TEmployer } from "../../types/types";
import Employer from "../Employer/Employer";


type Props = {
    employers: Array<TEmployer>
}

const EmployersList = (props: Props) => {
    const { employers } = props;
    return (
        <div>
            {employers.map((employer, index) => {
                return (
                    <Employer key={employer.id} employer={employer} index={index + 1} />
                )
            })}
        </div>
    )
}

export default EmployersList;