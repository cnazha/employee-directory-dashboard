import {NetworkStatus} from "@apollo/client";
import {useMemo} from "react";


type UseSearchStatusProps = {
    networkStatus: NetworkStatus,
    totalResults?: number,
}
const useSearchStatus = ({
    networkStatus,totalResults}: UseSearchStatusProps) => {
    
    const loading = useMemo(() => {
        return networkStatus === NetworkStatus.refetch || networkStatus === NetworkStatus.setVariables
        || networkStatus === NetworkStatus.fetchMore || networkStatus === NetworkStatus.poll
    }, [networkStatus]);

    const noItemsFound = useMemo(() => {
        return !totalResults && networkStatus === NetworkStatus.ready && !loading;
    }, [totalResults, networkStatus, loading]);

    return {
        noItemsFound,
        loading
    }
};

export default useSearchStatus;
