import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const STORAGE_KEY = 'portfolio:auth';

const AUTH_ID = import.meta.env.VITE_AUTH_ID as string | undefined;
const AUTH_PASSWORD = import.meta.env.VITE_AUTH_PASSWORD as string | undefined;

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  // 環境変数が未設定なら開発モード扱いで素通し
  const authDisabled = !AUTH_ID || !AUTH_PASSWORD;
  const [authed, setAuthed] = useState<boolean>(
    () => authDisabled || localStorage.getItem(STORAGE_KEY) === 'ok',
  );
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authed) document.body.style.overflow = '';
    else document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [authed]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (id === AUTH_ID && password === AUTH_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'ok');
      setAuthed(true);
      setError(null);
    } else {
      setError('ID またはパスワードが違います');
    }
  }

  if (authed) return <>{children}</>;

  return (
    <Backdrop>
      <Card onSubmit={onSubmit}>
        <Title>{'{ YUSUKE_OTSUKI Portfolio }'}</Title>
        <Lead>このサイトはご招待者限定です。ID とパスワードを入力してください。</Lead>

        <Label htmlFor="auth-id">ID</Label>
        <Input
          id="auth-id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          autoComplete="username"
          autoFocus
        />

        <Label htmlFor="auth-pw">Password</Label>
        <Input
          id="auth-pw"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && <Error>{error}</Error>}

        <Submit type="submit">Enter ↗</Submit>
      </Card>
    </Backdrop>
  );
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: ${theme.colors.bg.base};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 32px;
`;

const Card = styled.form`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['3']};
`;

const Title = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  margin-bottom: ${theme.spacing['4']};
`;

const Lead = styled.p`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.secondary};
  line-height: 1.7;
  margin: 0 0 ${theme.spacing['6']};
`;

const Label = styled.label`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  text-transform: uppercase;
`;

const Input = styled.input`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.md};
  color: ${theme.colors.text.primary};
  background: transparent;
  border: none;
  border-bottom: 1px solid ${theme.colors.border.default};
  padding: ${theme.spacing['2']} 0;
  outline: none;
  transition: border-color ${theme.motion.fast} ${theme.motion.ease};

  &:focus {
    border-bottom-color: ${theme.colors.text.primary};
  }
`;

const Error = styled.div`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.xs};
  color: #c0392b;
  margin-top: ${theme.spacing['1']};
`;

const Submit = styled.button`
  margin-top: ${theme.spacing['6']};
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  color: ${theme.colors.text.primary};
  background: transparent;
  border: 1px solid ${theme.colors.text.primary};
  padding: ${theme.spacing['3']} ${theme.spacing['6']};
  cursor: pointer;
  align-self: flex-start;
  transition: background ${theme.motion.fast} ${theme.motion.ease}, color ${theme.motion.fast} ${theme.motion.ease};

  &:hover {
    background: ${theme.colors.text.primary};
    color: ${theme.colors.bg.base};
  }
`;
