import type { Live2026RecruitmentProps } from '@/domain/entities/live2026';

const Live2026Recruitment = (props: Live2026RecruitmentProps) => {
  return (
    <section
      aria-labelledby="performer-recruitment-title"
      className="bg-tertiary px-6 py-8 sm:px-10 md:py-10"
    >
      <div className="mx-auto grid max-w-6xl gap-6 border-y border-secondary/30 py-6 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
        <div>
          <p className="font-body text-[0.625rem] uppercase tracking-[0.2em] text-secondary">
            Join the stage / 2026
          </p>
          <h2
            id="performer-recruitment-title"
            className="mt-3 font-display text-2xl text-dark md:text-3xl"
          >
            出演者募集中！
            <span className="mt-2 block font-body text-sm font-normal leading-7">
              お気軽にご相談ください
            </span>
          </h2>
        </div>
        <div className="border-t border-secondary/30 pt-5 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <p className="font-body text-xs tracking-[0.12em] text-secondary">出演申込締切</p>
          <p className="mt-2 font-display text-2xl text-dark md:text-3xl">
            <time dateTime={props.deadlineDateTime}>{props.deadline}</time>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Live2026Recruitment;
