import React, { FormEvent, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import githubLogo from '../../assets/images/github-logo.svg';
import { Title, Form, Repositories } from './styles';
import Repository from '../Repository';

interface Repository {
    id: number;
    full_name: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    description: string;
}

const Dashboard: React.FunctionComponent = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [inputRepo, setInputRepo] = useState('');

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const response = await api.get<Repository>(`/repos/${inputRepo}`);
        
        setRepositories([...repositories, response.data]);
        setInputRepo('');
    }

    return (
        <>
            <img src={githubLogo} alt="Github Explorer" />
            <Title>Explore Repositórios no Github</Title>

            <Form onSubmit={handleAddRepository}>
                <input 
                    value={inputRepo}
                    onChange={e => setInputRepo(e.target.value)}
                    placeholder="Digite o nome do repositório" /> 
                <button type="submit">Pesquisar</button>
            </Form>

            <Repositories>
                {repositories.map(repo => (
                    <a key={String(repo.id)} href="test">
                        <img src={repo.owner.avatar_url} 
                            alt={repo.owner.login} />
                        
                        <div>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;