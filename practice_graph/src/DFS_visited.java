public class DFS_visited {
    void traverse(Graph_impl graph, int s, boolean[] visited){
        if(s < 0 || s >= graph.size()){
            return;
        }
        if(visited[s])return;
        visited[s] = true;
        for(Edge e: graph.neighbours(s)){
            traverse(graph, e.to, visited);
        }
    }
}
