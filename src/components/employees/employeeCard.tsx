import React, {memo} from 'react';
import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Employee} from "@/gql/graphql";

const EmployeeCard = memo(({employee}: {employee: Employee}) => {
    return (
        <Card sx={{ width: [
            200
            ] }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={employee.avatar?.url}
                    alt={employee.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {employee.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {employee.department?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {employee.jobTitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}, (prevProps, nextProps) => {
    return prevProps.employee.id === nextProps.employee.id;
});

export default EmployeeCard;
