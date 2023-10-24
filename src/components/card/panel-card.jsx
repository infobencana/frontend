export function PanelCard({ title, action, children }) {
  return (
    <div className="w-full h-auto p-6 bg-white border border-snow rounded-md xl:rounded-[14px] font-inter">
      {title ? (
        <div className="flex justify-between items-center pb-3 mb-6 text-black border-b border-b-snow">
          <div className="font-bold text-base w-full max-w-[200px] overflow-hidden">
            {title}
          </div>
          {action ? <div>{action}</div> : false}
        </div>
      ) : (
        false
      )}
      <div>{children}</div>
    </div>
  );
}
