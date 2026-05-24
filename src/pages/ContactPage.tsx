import styled from 'styled-components';
import { contact } from '../data/resume';
import { theme } from '../styles/theme';

export function ContactPage() {
  return (
    <div>
      <PageHeader>
        <Label>Contact</Label>
        <Heading>連絡先</Heading>
      </PageHeader>

      <Body>
        <ContactItem>
          <ContactLabel>Email</ContactLabel>
          <ContactValue href={`mailto:${contact.email}`}>{contact.email}</ContactValue>
        </ContactItem>
        {contact.linkedin && (
          <ContactItem>
            <ContactLabel>LinkedIn</ContactLabel>
            <ContactValue href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              {contact.linkedin}
            </ContactValue>
          </ContactItem>
        )}
        {contact.twitter && (
          <ContactItem>
            <ContactLabel>X (Twitter)</ContactLabel>
            <ContactValue href={contact.twitter} target="_blank" rel="noopener noreferrer">
              {contact.twitter}
            </ContactValue>
          </ContactItem>
        )}
        <ContactItem>
          <ContactLabel>Location</ContactLabel>
          <ContactText>{contact.location}</ContactText>
        </ContactItem>
      </Body>
    </div>
  );
}

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing['10']};
`;

const Label = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['3']};
`;

const Heading = styled.h1`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size['2xl']};
  color: ${theme.colors.text.primary};
`;

const Body = styled.div`
  max-width: 480px;
`;

const ContactItem = styled.div`
  display: flex;
  gap: ${theme.spacing['6']};
  padding: ${theme.spacing['5']} 0;
  border-bottom: 1px solid ${theme.colors.border.default};
  align-items: center;
`;

const ContactLabel = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  width: 80px;
  flex-shrink: 0;
`;

const ContactValue = styled.a`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.text.primary};
  transition: opacity 150ms ease;
  &:hover { opacity: 0.6; }
`;

const ContactText = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.text.secondary};
`;
