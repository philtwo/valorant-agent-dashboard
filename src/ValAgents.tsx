import { useState, useEffect } from "react";

type Agent = {
    name: string;
    role: string;
    image: string;
  };
  
function ValAgents() {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [selectedRole, setSelectedRole] = useState<string>("All");

    useEffect(() => {
        fetch('https://valorant-api.com/v1/agents')
        .then((response) => response.json())
        .then((data) => {
            const agentData: Agent[] = data.data
            .filter((agent: any) => agent.isPlayableCharacter)
            .map((agent: any) => ({
            name: agent.displayName,
            role: agent.role?.displayName || 'Unknown',
            image: agent.displayIcon,
            }));
            setAgents(agentData);
        })
        .catch((error) => console.error('Error fetching agents:', error));
    }, []);

    const filteredAgents =
    selectedRole === "All"
        ? agents
        : agents.filter((agent) => agent.role === selectedRole);

    return (
        <div>
            <div className="ValAgents">
                <h1>Valorant Agents</h1>
                <div className="filter">
                    <label htmlFor="role-select">Filter by Role: </label>
                    <select
                    id="role-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    >
                    <option value="All">All</option>
                    <option value="Duelist">Duelist</option>
                    <option value="Controller">Controller</option>
                    <option value="Sentinel">Sentinel</option>
                    <option value="Initiator">Initiator</option>
                    </select>
                </div>
                <ul id="agents-list">
                    {filteredAgents.map((agent) => (
                    <li key={agent.name}>
                        <img src={agent.image} alt={`${agent.name} icon`} width="100" />
                        <h3>{agent.name}</h3>
                        <p>Role: {agent.role}</p>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ValAgents;