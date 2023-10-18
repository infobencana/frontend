import DisasterTable from "@/components/admin/disaster-table";

export default function HomeAdmin() {
  return (
    <div className="w-full grid grid-cols-[minmax(700px,920px)_1fr] auto-rows-auto gap-6">
      <DisasterTable />
    </div>
  );
}
