import Container from "@/components-custom/Container";
import EmployeeTabs from "@/components-custom/EmployeeTabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Example dashboard app built using the components.",
};

export default function Page() {
  return (
    <Container>
      <div className="min-h-[80vh] flex flex-col gap-8 px-4 py-4">
        <div>
          <EmployeeTabs />
        </div>
      </div>
    </Container>
  );
}
