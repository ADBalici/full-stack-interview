# Interview Task: Portal Just Integration

We need to integrate with the Romanian court system's public API to fetch lawsuit hearing data. 
The system is called Portal Just and is available at https://portal.just.ro. 
Your task is to create a NestJS provider that can query lawsuit  information by case number.

### Task 1: Lawsuit Lookup

Create a provider that fetches lawsuit data from Portal Just and an endpoint to query
it.

```
GET /lawsuits?caseNumber=:caseNumber or /lawsuits/:caseNumber

Response example:                                                                    
{                                                                                    
    "caseNumber": "306/3/2025",                                                        
    "filingDate": "2025-01-15",                                                        
    "institution": "Tribunalul București",                                             
    "hearings": [                                                                      
        {                                                                                
            "date": "2025-02-20",                                                          
            "time": "09:00",                                                               
            "resolution": null                                                             
        },                                                                               
        {                                                                                
            "date": "2025-03-15",                                                          
            "time": "10:30",                                                               
            "resolution": "Amânare pentru lipsă procedură"                                 
        }                                                                                
    ]                                                                                  
}
```

Test case numbers: 21969/301/2025, 22760/325/2025, 12636/180/2025

### Task 2: Subscribe to a Lawsuit

Create an endpoint to subscribe to a lawsuit. When subscribing, fetch the current    
data and store it.

Requirements:
- Validate case number format (number/number/year)
- Fetch lawsuit data from Portal Just
- Store the subscription with its current data
- Return 404 if case doesn't exist in Portal Just
- Return 409 if already subscribed to this case

```
POST /subscriptions                                                                  
Body: { "caseNumber": "306/3/2025" }

Response:                                                                            
{                                                                                    
    "id": "uuid",                                                                      
    "caseNumber": "306/3/2025",                                                        
    "subscribedAt": "2025-01-14T10:30:00Z",                                            
    "lawsuit": { ... }                                                                 
}
```

### Task 3: Calendar View

Aggregate all hearings from all subscribed lawsuits into a calendar view.

Requirements:
- Return hearings from ALL subscribed lawsuits
- Filter by date range
- Sort by date ascending
- Include case reference so user knows which lawsuit the hearing belongs to

```
GET /calendar?from=2025-01-01&to=2025-12-31

Response:                                                                            
{                                                                                    
    "hearings": [                                                                      
        {                                                                                
            "date": "2025-02-20",                                                          
            "time": "09:00",                                                               
            "caseNumber": "306/3/2025",                                                    
            "institution": "Tribunalul București",                                         
            "resolution": null                                                             
        },                                                                               
        {                                                                                
            "date": "2025-02-22",                                                          
            "time": "14:00",                                                               
            "caseNumber": "1/3/2025",                                                      
            "institution": "Judecătoria Sector 3 București",                               
            "resolution": null                                                             
        }                                                                                
    ]                                                                                  
}
```

### Task 4: Sync Subscriptions

Create an endpoint to refresh lawsuit data from Portal Just for all subscriptions (or
a specific one).

Requirements:
- Fetch fresh data from Portal Just
- Update stored lawsuit data
- Update lastSyncedAt timestamp
- For bulk sync: handle concurrency (don't fire 100 requests at once)

```
POST /subscriptions/sync                                                             
POST /subscriptions/:id/sync
```