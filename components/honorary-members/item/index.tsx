import React from "react";
import { HonoraryMemberForListQuery } from '../../../lib/api/honorary-members';

interface HonoraryMembersItemProps {
  honoraryMember: HonoraryMemberForListQuery
}

export default function HonoraryMembersItem({ honoraryMember }: HonoraryMembersItemProps) {
  return (
    <>
      <span>{honoraryMember.date || "Ukjent"}: </span>
      <strong>{honoraryMember.person.name}</strong>
      {honoraryMember.note && <span> ({honoraryMember.note})</span>}
    </>
  )
}
