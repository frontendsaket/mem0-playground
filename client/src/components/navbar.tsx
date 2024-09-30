import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <div className="flex justify-between align-middle px-6 py-2 bg-gray-50/50 border-b border-gray-200">
      <img className="my-auto w-28" src="full-logo.png" alt="mem0 logo" />
      <div className="my-auto flex gap-10">
        <h1 className="my-auto font-medium">Docs</h1>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
