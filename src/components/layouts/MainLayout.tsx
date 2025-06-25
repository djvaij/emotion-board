import Header from "@/components/layouts/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="pt-5">{children}</div>
    </>
  );
};

export default MainLayout;
