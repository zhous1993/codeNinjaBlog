import Link from 'next/link';

export type BlogItemType = {
  id: string;
  title: string;
  date: string;
  link: string;
};
export default function BlogList({ list }: { list: Array<BlogItemType> }) {
  return (
    <div>
      {list.map((item) => (
        <Link className="flex justify-between" href={item.link} key={item.id}>
          <span>{item.title}</span>
          <span>{item.date}</span>
        </Link>
      ))}
    </div>
  );
}
