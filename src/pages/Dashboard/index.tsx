import React, { FormEvent, useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link  } from 'react-router-dom';
import api from '../../services/api';
import githubLogo from '../../assets/images/github-logo.svg';
import { Title, Form, Repositories, Error } from './styles';
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
    const [inputRepo, setInputRepo] = useState('');
    const [inputError, setInputError] = useState('');

    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepos = localStorage.getItem('@GithubExplorer:repositories');
        if(storageRepos) {
            return JSON.parse(storageRepos);
        }

        return [];
    });

    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
    }, [repositories]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        
        if(!inputRepo) {
            setInputError('Digite o autor/nome do repositório');
            return;
        }

        try {
            const response = await api.get<Repository>(`/repos/${inputRepo}`);
            setRepositories([...repositories, response.data]);
            setInputRepo('');
            setInputError('');
        }
        catch(err) {
            setInputError('Erro na busca por esse repositório');
        }
    }

    return (
        <>
            <img src={githubLogo} alt="Github Explorer" />
            <Title>Explore Repositórios no Github</Title>

            <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
                <input 
                    value={inputRepo}
                    onChange={e => setInputRepo(e.target.value)}
                    placeholder="Digite o nome do repositório" /> 
                <button type="submit">Pesquisar</button>
            </Form>

            { inputError && <Error>{inputError}</Error> }

            <Repositories>
                {repositories.map(repo => (
                    <Link key={String(repo.id)} to={`repositories/${repo.full_name}`}>
                        <img src={repo.owner.avatar_url} 
                            alt={repo.owner.login} />
                        
                        <div>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;