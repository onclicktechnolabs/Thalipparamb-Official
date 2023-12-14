import { useRouter } from "next/navigation";
import EmployeForm from "components/admin/EmployeeForm";
import { createEmploye } from "components/api/admin/employee/route";

function AddEmployees() {
  const router = useRouter();
  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    sectionRole: "",
  };
  const onSubmit = async (formData) => {
    const res = await createEmploye({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      sectionRole: formData.sectionRole,
      role: "admin",
    });
    router.push("/admin/employees/all");
  };
  return (
    <div className="mt-6">
      <EmployeForm onSubmit={onSubmit} defaultValue={defaultValues} />
    </div>
  );
}

export default AddEmployees;
