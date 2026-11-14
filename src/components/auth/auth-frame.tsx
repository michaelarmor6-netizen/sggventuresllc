/** Centred frame for Clerk's sign-in and sign-up components. */
export function AuthFrame({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-coolgray">
      <div className="container-x flex flex-col items-center pb-24 pt-14 md:pt-20">
        <div className="w-full max-w-[26rem] text-center">
          <h1 className="font-display text-display text-midnight">{title}</h1>
          <p className="mt-3 text-[17px] leading-[1.47] text-slateink">{subtitle}</p>
        </div>
        <div className="mt-9 flex w-full max-w-[26rem] justify-center">{children}</div>
      </div>
    </section>
  );
}

/** Shown on /login and /signup until Clerk keys are configured. */
export function AuthUnavailable() {
  return (
    <div role="status" className="w-full rounded-[14px] border border-linehair bg-white p-6 text-center">
      <p className="text-[17px] font-semibold text-midnight">Sign-in is being set up.</p>
      <p className="mt-2 text-[15px] leading-[1.47] text-slateink">
        Accounts will be available shortly. In the meantime, use the{" "}
        <a href="/contact" className="text-royal underline underline-offset-2">
          contact page
        </a>{" "}
        to reach us.
      </p>
    </div>
  );
}
