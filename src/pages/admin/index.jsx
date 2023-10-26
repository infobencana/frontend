import DisasterTable from "@/components/disaster/disaster-table";
import { ListRequestUser } from "@/components/admin/list-request-user";

export default function HomeAdmin() {
  return (
    <div className="w-full lg:grid lg:grid-cols-[minmax(500px,1fr)_350px] auto-rows-auto gap-10">
      <DisasterTable />
      <div className="mt-5">
        <ListRequestUser />
      </div>
    </div>
  );
}
