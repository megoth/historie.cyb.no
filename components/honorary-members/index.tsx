import { HonoraryMemberForListQuery } from '../../lib/api/honorary-members';
import Container from '../container';
import HonoraryMembersItem from './item';

interface HonoraryMembersProps {
  honoraryMembers: Array<HonoraryMemberForListQuery>
}

export default function HonoraryMembers({ honoraryMembers }: HonoraryMembersProps) {
  return (
    <Container>
      <ul>
        {honoraryMembers.filter(({ date }) => !!date).map((member) => (
          <li key={member._id}>
            <HonoraryMembersItem honoraryMember={member} />
          </li>
        ))}
        {honoraryMembers.filter(({ date }) => !date).map((member) => (
          <li key={member._id}>
            <HonoraryMembersItem honoraryMember={member} />
          </li>
        ))}
      </ul>
    </Container>
  )
}
