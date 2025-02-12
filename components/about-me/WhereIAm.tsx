import { LinkItem } from "@/types/about-me";

interface IProps {
  links: LinkItem[];
  whereIAm: string;
}
export default function WhereIAm({ links, whereIAm }: IProps) {
  return (
    <article className="pt-20 border-t border-white/20">
      <div className="container mx-auto grid grid-cols-1 mlg:grid-cols-2 gap-[50px] mlg:gap-[100px]">
        <div>
          <h2 className="text-heading-b-20 text-neutral-text-secondary mb-4">
            WHERE I AM NOW
          </h2>
          <p className="text-white whitespace-pre-wrap">{whereIAm}</p>
        </div>

        <div>
          <h2 className="text-heading-b-20 text-neutral-text-secondary mb-4">
            LINKS
          </h2>
          <ol className="flex flex-col gap-[10px] list-decimal text-white pl-5">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-neutral-text-secondary transition-colors"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}
