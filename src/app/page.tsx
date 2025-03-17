import LoginCard from "@/components/loginCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-screen min-h-full flex">
      <div className="my-auto flex-1">
        <LoginCard />
        <footer className="absolute bottom-0 flex mt-20 xl:text-left">
          <p className="justify-items-end text-muted-foreground text-sm ml-2 mb-2">
            © 2025 ClinicPal
          </p>
        </footer>
      </div>
      <Image
        className="hidden md:block max-w-[50%] h-full object-cover"
        src="/landing_image.jpg"
        alt="landing_page_image"
        width={1000}
        height={1000}
        priority
      />
    </div>
  );
}
