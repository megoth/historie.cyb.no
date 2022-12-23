import { getClient } from "../sanity";

export interface HonoraryMemberForListQuery
  extends Omit<Sanity.Schema.HonoraryMember, "person"> {
  person: Sanity.Schema.Person,
  date: string;
  note: string;
}

export async function getAllHonoraryMembers(
  preview: boolean
): Promise<Array<HonoraryMemberForListQuery>> {
  return getClient(preview)
      .fetch(`*[ _type == "honoraryMember" ] | order(date desc){
    _id,
    'person': person->,
    date,
    note,
  }`);
}
